package routes

import (
	"ThirdEye/blockchain"
	"crypto/ecdsa"
	"crypto/rand"
	"crypto/sha256"
	"encoding/asn1"
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
	"strconv"
)

type AddEyesRequest struct {
	FromEmail   string `json:"fromEmail"`
	ToEmail     string `json:"toEmail"`
	PrivateKeyD string `json:"privateKey"`
	Eyes        string `json:"eyes"`
}

func GiveEyeRoute(w http.ResponseWriter, r *http.Request, blockchainInstance *blockchain.Blockchain) {
	var request AddEyesRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	fromEmail := request.FromEmail
	toEmail := request.ToEmail
	privateKeyD := request.PrivateKeyD
	eyes, _ := strconv.ParseFloat(request.Eyes, 64)

	PreviousBlock := blockchainInstance.Blocks[len(blockchainInstance.Blocks)-1]

	_, fromExists := PreviousBlock.User[fromEmail]
	if !fromExists {
		http.Error(w, fmt.Sprintf("%s does not exist.", fromEmail), http.StatusBadRequest)
		return
	}

	_, toExists := PreviousBlock.User[toEmail]
	if !toExists {
		http.Error(w, fmt.Sprintf("%s does not exist.", toEmail), http.StatusBadRequest)
		return
	}

	D := new(big.Int)
	D.SetString(privateKeyD, 10)

	privateKey := ecdsa.PrivateKey{
		PublicKey: *PreviousBlock.User[fromEmail].PublicKey,
		D:         D,
	}

	validation := ValidatePrivateKey(PreviousBlock.User[fromEmail].PublicKey, &privateKey)
	if !validation {
		http.Error(w, "Invalid Private Key", http.StatusBadRequest)
		return
	} else {

		_, err := blockchainInstance.GiveEyes(fromEmail, toEmail, &privateKey, eyes)
		if err != nil {
			http.Error(w, "Error in transaction", http.StatusBadRequest)
		}

		fmt.Fprintf(w, "Successful transfer")
	}
}

func ValidatePrivateKey(publicKey *ecdsa.PublicKey, privateKey *ecdsa.PrivateKey) bool {
	message := []byte("validation message")

	hash := sha256.Sum256(message)

	r, s, err := ecdsa.Sign(rand.Reader, privateKey, hash[:])
	if err != nil {
		fmt.Println("Error signing the message:", err)
		return false
	}

	signature, err := asn1.Marshal(struct{ R, S *big.Int }{r, s})
	if err != nil {
		fmt.Println("Error marshaling the signature:", err)
		return false
	}

	if !ecdsa.VerifyASN1(publicKey, hash[:], signature) {
		fmt.Println("Verification failed: The private key does not correspond to the provided public key.")
		return false
	}
	return true
}
