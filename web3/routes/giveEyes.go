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

	fmt.Println("Public key: ", *PreviousBlock.User[fromEmail].PublicKey)

	D := new(big.Int)
	D.SetString(privateKeyD, 10)

	privateKey := ecdsa.PrivateKey{
		PublicKey: *PreviousBlock.User[fromEmail].PublicKey,
		D:         D,
	}

	fmt.Println("Private key: ", privateKey)

	fmt.Println(fromEmail, toEmail, eyes, privateKeyD, privateKey, "\n\n\n")

	// msg := blockchainInstance.GiveEyes(fromEmail, toEmail, privateKey, eyes)

	// for _, block := range blockchainInstance.Blocks {
	// 	fmt.Println("Hash of the block:", block.CurrHash)
	// 	fmt.Println("Hash of prev block:", block.PreviousHash)
	// 	fmt.Println("Data:", block.User)
	// 	fmt.Println("Transaction:", block.TransactionHash)

	// 	fmt.Println("\n\n")
	// }
	// fmt.Fprintf(w, "%s", msg)
	validation := ValidatePrivateKey(PreviousBlock.User[fromEmail].PublicKey, &privateKey)

	fmt.Fprintf(w, "%s", validation)
}

func ValidatePrivateKey(publicKey *ecdsa.PublicKey, privateKey *ecdsa.PrivateKey) bool {
	// Generate a random message to sign
	message := []byte("validation message")

	// Hash the message
	hash := sha256.Sum256(message)

	// Sign the hashed message with the private key
	r, s, err := ecdsa.Sign(rand.Reader, privateKey, hash[:])
	if err != nil {
		fmt.Println("Error signing the message:", err)
		return false
	}

	// Marshal the signature
	signature, err := asn1.Marshal(struct{ R, S *big.Int }{r, s})
	if err != nil {
		fmt.Println("Error marshaling the signature:", err)
		return false
	}

	// Verify the signature using the public key
	if !ecdsa.VerifyASN1(publicKey, hash[:], signature) {
		fmt.Println("Verification failed: The private key does not correspond to the provided public key.")
		return false
	}

	// Validation successful
	return true
}
