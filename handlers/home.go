package handlers

import (
	"fmt"
	"net/http"
)

func init() {
	http.HandleFunc("/", home)
	http.HandleFunc("/home", home)
	http.HandleFunc("/demo", demo)

	http.HandleFunc("/consulting", consulting)
	http.HandleFunc("/about", about)
	http.HandleFunc("/products", products)
}

func home(w http.ResponseWriter, r *http.Request) {
	if err := Templates.ExecuteTemplate(w, "/home/index", nil); err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}

func demo(w http.ResponseWriter, r *http.Request) {
	if err := Templates.ExecuteTemplate(w, "/home/demo", nil); err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}

func consulting(w http.ResponseWriter, r *http.Request) {
	if err := Templates.ExecuteTemplate(w, "/home/consulting", nil); err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}

func about(w http.ResponseWriter, r *http.Request) {
	if err := Templates.ExecuteTemplate(w, "/home/about", nil); err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}

func products(w http.ResponseWriter, r *http.Request) {
	if err := Templates.ExecuteTemplate(w, "/home/products", nil); err != nil {
		fmt.Fprintf(w, "%s", err.Error())
	}
}
