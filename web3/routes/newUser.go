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

func CreateNewUser(w http.ResponseWriter, r *http.Request) {
	var request CreateUserRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	email := request.Email
	fmt.Println(email)
	userInstance, _, e := blockchain.GenerateUserWallet(email)
	if e != nil {
		fmt.Fprintf(w, "Error in creating user: %s", e)
	}
	userMap := make(map[string]*blockchain.User)
	bck := blockchain.NewBlock(userInstance, nil, email, userMap)
	fmt.Println(bck.User[email].PublicKey)

	fmt.Fprintf(w, "Hello")
}
