package handlers

import (
	"html/template"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

var Templates *template.Template = template.Must(ParseViews("views"))

func ParseViews(name string) (ts *template.Template, err error) {
	var filenames []string
	path, err := os.Getwd()
	path = filepath.Join(path, "views")
	if err != nil {
		return
	}

	ts = template.New(name)
	err = filepath.Walk(path, func(src string, info os.FileInfo, err error) error {
		if !info.IsDir() && filepath.Ext(src) == ".html" {
			filenames = append(filenames, src)
		}
		return nil
	})
	if err != nil {
		return
	}

	for _, filename := range filenames {
		b, err := ioutil.ReadFile(filename)
		if err != nil {
			return ts, err
		}
		src := strings.TrimPrefix(filename, path)
		src = strings.TrimSuffix(src, ".go.html")

		name := filepath.Clean(src)
		tl := ts.New(name)
		_, err = tl.Parse(string(b))
		if err != nil {
			return ts, err
		}
	}
	return
}
