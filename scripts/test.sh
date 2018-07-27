#!/bin/sh


echo "Good morning guys"
echo "What's your name"
read USER_NAME
echo "Hello $USER_NAME"
echo "I'll create you a file call ${USER_NAME}_file"
touch "${USER_NAME}_file"
echo "Done !!!!"

