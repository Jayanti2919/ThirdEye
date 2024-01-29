package blockchain

import (
	"bytes"
	"crypto/ecdsa"
	"crypto/rand"
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"math/big"
	"reflect"
	"time"
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

func createTransaction(from *ecdsa.PublicKey, to *ecdsa.PublicKey, amount int, R big.Int, S big.Int) *Transaction {
	return &Transaction{
		From:   from,
		To:     to,
		Amount: amount,
		r:      R,
		s:      S,
	}
}

func NewGenesisBlock() *Block {
	block, _ := NewBlock(nil, []byte{}, "genesis", make(map[string]*User), nil)
	return block
}

func NewBlock(user *User, prevBlockHash []byte, email string, prevUserMap map[string]*User, privateKey *ecdsa.PrivateKey) (*Block, error) {
	var transaction *Transaction
	if privateKey != nil {
		r, s, err := signTransaction(privateKey, user)
		if err != nil {
			return nil, err
		}
		fmt.Println(reflect.TypeOf(r))
		transaction = createTransaction(user.PublicKey, user.PublicKey, 0, *r, *s)
	}
	userMap := make(map[string]*User)
	for key, value := range prevUserMap {
		userMap[key] = value
	}

	userMap[email] = user

	block := &Block{
		Timestamp:       time.Now().Unix(),
		PreviousHash:    prevBlockHash,
		CurrHash:        []byte{},
		User:            userMap,
		TransactionHash: transaction,
		Nonce:           0,
	}

	nonce := 0
	for {
		block.CurrHash = CalculateHash(*block, nonce)
		if isValid(block.CurrHash) {
			break
		}
		nonce++
	}
	block.Nonce = nonce
	return block, nil
}

func isValid(hash []byte) bool {
	return bytes.HasPrefix(hash, []byte{0, 0})
}

func CalculateHash(block Block, nonce int) []byte {
	data := []byte(fmt.Sprintf("%d%s%s%d", block.Timestamp, block.PreviousHash, block.User, nonce))
	hash := sha256.Sum256(data)
	return hash[:]
}
