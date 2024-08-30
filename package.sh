#!/bin/bash
rm extension.zip
zip -r extension.zip . -x "*.md" "screenshot.png" "package.sh" "extension.zip" ".git*"
