package blockchain

func (blockchain *Blockchain) AddBlock(userInstance *User, email string) {
	PreviousBlock := blockchain.Blocks[len(blockchain.Blocks)-1]

	newBlock := NewBlock(userInstance, PreviousBlock.CurrHash, email, PreviousBlock.User)

	blockchain.Blocks = append(blockchain.Blocks, newBlock)
}

func NewBlockchain() *Blockchain {
	return &Blockchain{[]*Block{NewGenesisBlock()}}
}
