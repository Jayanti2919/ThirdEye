package blockchain

import (
	"crypto/ecdsa"
	"math/big"
)

type Transaction struct {
	From   *ecdsa.PublicKey
	To     *ecdsa.PublicKey
	Amount float64
	r      big.Int
	s      big.Int
}

type User struct {
	PublicKey *ecdsa.PublicKey
	Eyes      float64
	Email     string
	Address   string
	Earnings  float64
	Spent     float64
}

type Block struct {
	Timestamp       int64
	PreviousHash    []byte
	CurrHash        []byte
	User            map[string]*User
	Nonce           int
	TransactionHash *Transaction
}

type Blockchain struct {
	Blocks []*Block
}
