package blockchain

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/big"
	"strings"
)

//generation of wallet:
func generateKeyPair() (*ecdsa.PrivateKey, *ecdsa.PublicKey, error) {
	curve := elliptic.P256()
	private, err := ecdsa.GenerateKey(curve, rand.Reader)
	if err != nil {
		return nil, nil, err
	}
	public := &private.PublicKey

	return private, public, nil
}

func generateAddress(publicKey *ecdsa.PublicKey) string {
	publicKeyBytes := elliptic.Marshal(publicKey.Curve, publicKey.X, publicKey.Y)
	hash := sha256.Sum256(publicKeyBytes)
	return hex.EncodeToString(hash[:])
}

func GenerateUserWallet(email string) (*User, *ecdsa.PrivateKey, error) {
	privateKey, publicKey, err := generateKeyPair()
	if err != nil {
		return nil, nil, err
	}

	address := generateAddress(publicKey)

	return &User{
		PublicKey: publicKey,
		Address:   address,
		Eyes:      75,
		Email:     email,
		Earnings:  0,
		Spent:     0,
	}, privateKey, nil
}

// convert keys to string
func PublicKeyToString(publicKey *ecdsa.PublicKey) string {
	xStr := hex.EncodeToString(publicKey.X.Bytes())
	yStr := hex.EncodeToString(publicKey.Y.Bytes())
	return fmt.Sprintf("%s;%s", xStr, yStr)
}

func PrivateKeyToString(privateKey *ecdsa.PrivateKey) string {
	dStr := hex.EncodeToString(privateKey.D.Bytes())
	publicKeyStr := PublicKeyToString(&privateKey.PublicKey)
	return fmt.Sprintf("%s;%s", dStr, publicKeyStr)
}

//convert from strings to key
func StringToPublicKey(publicKeyStr string) (*ecdsa.PublicKey, error) {
	components := strings.Split(publicKeyStr, ";")
	if len(components) != 2 {
		return nil, fmt.Errorf("invalid public key")
	}

	x, err := hex.DecodeString(components[0])
	if err != nil {
		return nil, err
	}

	y, err := hex.DecodeString(components[1])
	if err != nil {
		return nil, err
	}

	X := new(big.Int).SetBytes(x)
	Y := new(big.Int).SetBytes(y)

	return &ecdsa.PublicKey{
		Curve: elliptic.P256(),
		X:     X,
		Y:     Y,
	}, nil
}
