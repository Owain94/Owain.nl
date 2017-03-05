#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
    cat dist/index.html | gsed 's/\(.*\)><\/s\(.*\)/\1 async><\/s\2/' | gsed 's/\(.*\)<link\(.*\)/\1  <link\2/' | gsed 's/\(.*\)    <link\(.*\)/\1  <link\2/' | gsed 's/\(.*\)<\/head>\(.*\)/\1\n<\/head>\2/' | gsed -e 's:</script>:</script>\n:g' | gsed 's/\(.*\)<script\(.*\)/\1  <script\2/' > dist/index2.html;
    mv -f dist/index2.html dist/index.html
else
   cat dist/index.html | sed 's/\(.*\)><\/s\(.*\)/\1 async><\/s\2/' | sed 's/\(.*\)<link\(.*\)/\1  <link\2/' | sed 's/\(.*\)    <link\(.*\)/\1  <link\2/' | sed 's/\(.*\)<\/head>\(.*\)/\1\n<\/head>\2/' | sed -e 's:</script>:</script>\n:g' | sed 's/\(.*\)<script\(.*\)/\1  <script\2/' > dist/index2.html;
    mv -f dist/index2.html dist/index.html
fi