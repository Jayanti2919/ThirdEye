package blockchain

import (
	"crypto/ecdsa"
	"errors"
	"fmt"
	"reflect"
)

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

	block, err := MineBlock(userMap, prevBlockHash, transaction)
	return block, err

}

func addEyeBlock(fromEmail string, toEmail string, prevBlockHash []byte, prevUserMap map[string]*User, privateKey *ecdsa.PrivateKey, eyes float64) (*Block, error) {

	userMap := make(map[string]*User)
	for key, value := range prevUserMap {
		userMap[key] = value
	}
	if userMap[fromEmail].Eyes < eyes {
		return nil, errors.New("Not enough eyes")
	}

	userMap[fromEmail].Eyes -= eyes
	userMap[toEmail].Eyes += eyes
	userMap[fromEmail].Spent += eyes
	userMap[toEmail].Earnings += eyes

	r, s, err := signTransaction(privateKey, userMap[fromEmail])
	if err != nil {
		userMap[fromEmail].Eyes += eyes
		userMap[toEmail].Eyes -= eyes
		userMap[fromEmail].Spent -= eyes
		userMap[toEmail].Earnings -= eyes

		return nil, errors.New("Error creating transaction")
	}

	transaction := createTransaction(userMap[fromEmail].PublicKey, userMap[toEmail].PublicKey, eyes, *r, *s)
	block, err := MineBlock(userMap, prevBlockHash, transaction)

	return block, err

}
