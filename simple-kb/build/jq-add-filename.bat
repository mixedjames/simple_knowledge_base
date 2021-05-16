@jq --arg file %1 ". + {file: $file}" %2 > %3
