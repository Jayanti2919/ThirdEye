package blockchain

import (
	"crypto/ecdsa"
)

func (blockchain *Blockchain) AddBlock(userInstance *User, email string, privateKey *ecdsa.PrivateKey) error {
	// fmt.Println("Private key: ", privateKey)
	PreviousBlock := blockchain.Blocks[len(blockchain.Blocks)-1]

	newBlock, err := NewBlock(userInstance, PreviousBlock.CurrHash, email, PreviousBlock.User, privateKey)

	if err != nil {
		return err
	}
	blockchain.Blocks = append(blockchain.Blocks, newBlock)
	return nil

}

func NewBlockchain() *Blockchain {
	return &Blockchain{[]*Block{NewGenesisBlock()}}
}
