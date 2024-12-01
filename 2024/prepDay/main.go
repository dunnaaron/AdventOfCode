package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"log"

	"github.com/joho/godotenv"
)

func getEnvVar(key string) string {
	err := godotenv.Load("../.env")

	if err != nil {
			log.Fatal(err)
	}
	return os.Getenv(key)
}

func getDayVar() string {
	if len(os.Args) == 1 {
		log.Fatal("Missing day.")
	}
	
	return os.Args[1]
}

func writeInputFile(input []byte, day string) {
	targetFile, err := os.Create("../" + day + "/input.txt")
	if err != nil {
		panic(err)
	}
	// close targetFile on exit and check for its returned error
	defer func() {
		if err := targetFile.Close(); err != nil {
			panic(err)
		}
	}()

	// write a chunk
	if _, err := targetFile.Write(input[:]); err != nil {
			panic(err)
	}
}

func main() {
	cookie := getEnvVar("COOKIE")
	year := getEnvVar("YEAR")
	day := getDayVar()
	var b strings.Builder

	b.WriteString("https://adventofcode.com/")
	b.WriteString(year)
	b.WriteString("/day/")
	b.WriteString(day)
	b.WriteString("/input")

	client := &http.Client{}
	
	req, err := http.NewRequest("GET", b.String(), nil)

	if err != nil {
		fmt.Println("Failed to build request.")
		log.Fatal(err)
	}
	
	req.Header.Add("Cookie", "session=" + cookie + ";")
	
	res, err := client.Do(req)
	
	if err != nil {
		fmt.Println("Request failed.")
		log.Fatal(err)
	}
	
	fmt.Println("Request ok.")

	body, err := io.ReadAll(res.Body)

	if err != nil {
		fmt.Println("Failed to parse response body.")
		log.Fatal(err)
	}

	writeInputFile(body, day)
}