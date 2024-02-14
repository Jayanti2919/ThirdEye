package routes

import (
	"ThirdEye/blockchain"
	"crypto/ecdsa"
	"encoding/json"
	"fmt"
	"math/big"
	"net/http"
)

type GetWalletRequest struct {
	Email       string `json:"email"`
	PrivateKeyD string `json:"privateKey"`
}

func GetWalletRoute(w http.ResponseWriter, r *http.Request, blockchainInstance *blockchain.Blockchain) {
	var request GetWalletRequest

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
	} else {

		walletDetails := struct {
			Eyes     float64
			Address  string
			Earnings float64
			Spent    float64
		}{
			Eyes:     PreviousBlock.User[email].Eyes,
			Address:  PreviousBlock.User[email].Address,
			Earnings: PreviousBlock.User[email].Earnings,
			Spent:    PreviousBlock.User[email].Spent,
		}

		userJSON, err := json.Marshal(walletDetails)
		if err != nil {
			http.Error(w, "Error encoding User to JSON", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(userJSON)
	}
}
