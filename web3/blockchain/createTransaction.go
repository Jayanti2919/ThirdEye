package blockchain

import (
	"crypto/ecdsa"
	"crypto/rand"
	"crypto/sha256"
	"encoding/json"
	"math/big"
)

func signTransaction(privateKey *ecdsa.PrivateKey, user *User) (*big.Int, *big.Int, error) {
	userBytes, err := json.Marshal(user)
	if err != nil {
		return nil, nil, err
	}

	hash := sha256.Sum256(userBytes)
	r, s, err := ecdsa.Sign(rand.Reader, privateKey, hash[:])
	if err != nil {
		return nil, nil, err
	}
	return r, s, nil
}

func createTransaction(from *ecdsa.PublicKey, to *ecdsa.PublicKey, amount float64, R big.Int, S big.Int) *Transaction {
	return &Transaction{
		From:   from,
		To:     to,
		Amount: amount,
		r:      R,
		s:      S,
	}
}
