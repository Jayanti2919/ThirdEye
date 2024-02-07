package blockchain

func validateBlock(blockchain *Blockchain) *Blockchain {
	PreviousBlock := blockchain.Blocks[len(blockchain.Blocks)-1]

	if isValid(PreviousBlock.CurrHash) {

		return blockchain
	} else {

		blockchain.Blocks = blockchain.Blocks[:len(blockchain.Blocks)-1]
		return validateBlock(blockchain)
	}

}
