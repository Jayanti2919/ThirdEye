package blockchain

import (
	"bytes"
	"crypto/sha256"
	"fmt"
	"time"
)

func MineBlock(userMap map[string]*User, prevBlockHash []byte, transaction *Transaction) (*Block, error) {

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

func CalculateHash(block Block, nonce int) []byte {
	data := []byte(fmt.Sprintf("%d%s%s%d", block.Timestamp, block.PreviousHash, block.User, nonce))
	hash := sha256.Sum256(data)
	return hash[:]
}

func isValid(hash []byte) bool {
	return bytes.HasPrefix(hash, []byte{0, 0})
}
