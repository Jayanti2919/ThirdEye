// main.go
package main

import (
	"ThirdEye/blockchain"
	"ThirdEye/routes"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func handler(w http.ResponseWriter, r *http.Request) {
	walletInstance, _, _ := blockchain.GenerateUserWallet("shivpreet16@gmail.com")
	fmt.Fprint(w, walletInstance)
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]
	fmt.Fprintf(w, "Hello, %s!", name)
}

func main() {
	r := mux.NewRouter()

	blockchainInstance := blockchain.NewBlockchain()

	r.HandleFunc("/", handler)

	r.HandleFunc("/user/createNewUser", func(w http.ResponseWriter, r *http.Request) {
		routes.CreateNewUser(w, r, blockchainInstance)
	}).Methods("POST")
	r.HandleFunc("/user/giveEyes", func(w http.ResponseWriter, r *http.Request) {
		routes.GiveEyeRoute(w, r, blockchainInstance)
	}).Methods("POST")
	r.HandleFunc("/user/buyEyes", func(w http.ResponseWriter, r *http.Request) {
		routes.BuyEyesRoute(w, r, blockchainInstance)
	}).Methods("POST")
	r.HandleFunc("/user/getEyes", func(w http.ResponseWriter, r *http.Request) {
		routes.GetEyesRoute(w, r, blockchainInstance)
	}).Methods("POST")
	r.HandleFunc("/user/getWalletDetails", func(w http.ResponseWriter, r *http.Request) {
		routes.GetWalletRoute(w, r, blockchainInstance)
	}).Methods("POST")
	r.HandleFunc("/user/validatePrivateKey", func(w http.ResponseWriter, r *http.Request) {
		routes.ValidatePrivateKeyRoute(w, r, blockchainInstance)
	}).Methods("POST")
	// validate private key

	fmt.Println("Server is running on :8000")
	log.Fatal(http.ListenAndServe(":8000", r))
}
