package blockchain

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"time"
)

// func createTransaction(from *ecdsa.PublicKey, to ecdsa.PublicKey, amount int, R big.Int, S big.Int) *Transaction {
// 	return &Transaction{
// 		From:   from,
// 		To:     to,
// 		Amount: amount,
// 		r:      R,
// 		s:      S,
// 	}
// }

func NewGenesisBlock() *Block {
	return NewBlock(nil, []byte{}, "genesis", make(map[string]*User))
}

func NewBlock(user *User, prevBlockHash []byte, email string, userMap map[string]*User) *Block {
	// transaction := createTransaction()
	block := &Block{
		Timestamp:    time.Now().Unix(),
		PreviousHash: prevBlockHash,
		CurrHash:     []byte{},
		User:         userMap,
		Transaction:  nil,
		Nonce:        0
	}

	block.User[email] = user
	nonce := 0
	for {
		block.CurrHash = CalculateHash(*block, nonce)
		if isValid(block.CurrHash) {
			break
		}
		nonce++
	}
	block.Nonce = nonce
	return block
}

func isValid(hash []byte) bool {
	return bytes.HasPrefix(hash, []byte{0, 0})
}

func CalculateHash(block Block, nonce int) []byte {
	data := []byte(fmt.Sprintf("%d%s%s%d", block.Timestamp, block.PreviousHash, block.User, nonce))
	hash := sha256.Sum256(data)
	return hash[:]
}
