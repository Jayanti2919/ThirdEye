// main.go
package main

import (
	"ThirdEye/blockchain"
	"ThirdEye/routes"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	shell "github.com/ipfs/go-ipfs-api"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hii")
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
	r.HandleFunc("/user/redeemEyes", func(w http.ResponseWriter, r *http.Request) {
		routes.RedeemEyesRoute(w, r, blockchainInstance)
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
	r.HandleFunc("/user/generateJWT", func(w http.ResponseWriter, r *http.Request) {
		routes.GenerateJWT(w, r, blockchainInstance)
	}).Methods("POST")
	r.HandleFunc("/user/validateJWT", func(w http.ResponseWriter, r *http.Request) {
		routes.ValidateJWT(w, r, blockchainInstance)
	}).Methods("POST")
	// validate private key

	r.HandleFunc("/uploadToIPFS", func(w http.ResponseWriter, r *http.Request) {
		sh := shell.NewShell("localhost:5001")

		// Parse the multipart form in the request
		// err := r.ParseMultipartForm(10 << 20) // Max memory 10MB
		// if err != nil {
		// 	fmt.Println(err)
		// 	return
		// }

		// Get the file from the form
		file, _, err := r.FormFile("video")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer file.Close()
		fileThumbnail, _, err := r.FormFile("thumbnail")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer fileThumbnail.Close()

		// Add the file to IPFS
		cid, err := sh.Add(file)
		if err != nil {
			fmt.Println(err)
			return
		}
		cidThumbnail, err := sh.Add(fileThumbnail)
		if err != nil {
			fmt.Println(err)
			return
		}

		response := map[string]string{
			"cid":          cid,
			"cidThumbnail": cidThumbnail,
		}

		jsonResponse, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonResponse)
	}).Methods("POST")
	// r.HandleFunc("/uploadToIPFS", func(w http.ResponseWriter, r *http.Request) {
	// 	sh := shell.NewShell("localhost:5001")

	// 	cid, err := sh.Add(strings.NewReader("Hello World"))
	// 	if err != nil {
	// 		fmt.Println(err)
	// 	}
	// 	fmt.Print("CID:", cid)
	// }).Methods("POST")

	corsHandler := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
		handlers.AllowCredentials(),
	)(r)

	fmt.Println("Server is running on :8000")
	log.Fatal(http.ListenAndServe(":8000", corsHandler))
}
