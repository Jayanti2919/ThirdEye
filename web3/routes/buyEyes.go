package routes

import (
	"ThirdEye/blockchain"
	"crypto/ecdsa"
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
	"strconv"
)

type GiveEyesRequest struct {
	Email       string `json:"email"`
	PrivateKeyD string `json:"privateKey"`
	Eyes        string `json:"eyes"`
}

func BuyEyesRoute(w http.ResponseWriter, r *http.Request, blockchainInstance *blockchain.Blockchain) {
	var request GiveEyesRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	email := request.Email
	eyes, _ := strconv.ParseFloat(request.Eyes, 64)
	privateKeyD := request.PrivateKeyD

	if eyes <= 1 {
		http.Error(w, "Enter more than 1 eyes.", http.StatusBadRequest)
	}

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
	} else {
		_, err := blockchainInstance.BuyEyes(email, &privateKey, eyes)
		if err != nil {
			fmt.Println(err)
			http.Error(w, "error creating transaction", http.StatusBadRequest)
		}

		fmt.Fprintf(w, "Successful transfer")
	}
}
