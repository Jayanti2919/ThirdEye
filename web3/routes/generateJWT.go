package routes

import (
	"ThirdEye/blockchain"
	"crypto/ecdsa"
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type jwtGenerationDetails struct {
	Email       string `json:"email"`
	PrivateKeyD string `json:"privateKey"`
}

type jwtValidateDetails struct {
	Email string `json:"email"`
	JWT   string `json:"jwt"`
}

func GenerateJWT(w http.ResponseWriter, r *http.Request, blockchainInstance *blockchain.Blockchain) {
	var request jwtGenerationDetails

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	email := request.Email
	privateKeyD := request.PrivateKeyD

	PreviousBlock := blockchainInstance.Blocks[len(blockchainInstance.Blocks)-1]

	_, emailExists := PreviousBlock.User[email]
	if !emailExists {
		http.Error(w, fmt.Sprintf("%s does not exist.", email), http.StatusBadRequest)
		return
	}

	D := new(big.Int)
	D.SetString(privateKeyD, 10)

	privateKey := ecdsa.PrivateKey{
		PublicKey: *PreviousBlock.User[email].PublicKey,
		D:         D,
	}

	validation := ValidatePrivateKey(PreviousBlock.User[email].PublicKey, &privateKey)

	if !validation {
		http.Error(w, "Invalid Private Key", http.StatusBadRequest)
		return
	}
	//generate jwt with public key in it

	secretKey := []byte("your_secret_key_here")
	claims := jwt.MapClaims{
		"publicKey": PreviousBlock.User[email].PublicKey,
		"exp":       time.Now().Add(time.Hour).Unix(), // Token expires in 1 hour
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedToken, err := token.SignedString(secretKey)
	if err != nil {
		http.Error(w, "Error generating jwt", http.StatusBadRequest)
		// return "", err
	}

	fmt.Fprintf(w, "%s", signedToken)
	// return signedToken, nil

}
func ValidateJWT(w http.ResponseWriter, r *http.Request, blockchainInstance *blockchain.Blockchain) {
	var request jwtValidateDetails

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	email := request.Email

	PreviousBlock := blockchainInstance.Blocks[len(blockchainInstance.Blocks)-1]

	_, emailExists := PreviousBlock.User[email]
	if !emailExists {
		http.Error(w, fmt.Sprintf("%s does not exist.", email), http.StatusBadRequest)
		return
	}

	secretKey := []byte("your_secret_key_here")
	token, err := jwt.Parse(request.JWT, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})
	if err != nil {
		http.Error(w, "Unexpected error parsing token.", http.StatusBadRequest)
		return
	}

	if !token.Valid {
		http.Error(w, "Invalid token.", http.StatusBadRequest)
		return
	}

	fmt.Fprintf(w, "ok")
}
