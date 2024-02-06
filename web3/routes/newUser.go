package routes

import (
	"ThirdEye/blockchain"
	"encoding/json"
	"fmt"
	"net/http"
)

type CreateUserRequest struct {
	Email string `json:"email"`
}

func CreateNewUser(w http.ResponseWriter, r *http.Request, blockchainInstance *blockchain.Blockchain) {
	var request CreateUserRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	email := request.Email
	fmt.Println(email)
	userInstance, privateKey, e := blockchain.GenerateUserWallet(email)
	if e != nil {
		fmt.Fprintf(w, "Error in creating user: %s", e)
	}

	err = blockchainInstance.AddBlock(userInstance, email, privateKey)

	if err != nil {
		fmt.Println("Error in creating new user: ", err)
	}
	// userMap := make(map[string]*blockchain.User)
	// bck := blockchain.NewBlock(userInstance, nil, email, userMap)
	// fmt.Println(bck.User[email].PublicKey)
	for _, block := range blockchainInstance.Blocks {
		fmt.Println("Hash of the block:", block.CurrHash)
		fmt.Println("Hash of prev block:", block.PreviousHash)
		fmt.Println("Data:", block.User)
		fmt.Println("Transaction:", block.TransactionHash)

		fmt.Println("\n\n")
	}

	fmt.Fprintf(w, "Private key %s", privateKey.D)
}
