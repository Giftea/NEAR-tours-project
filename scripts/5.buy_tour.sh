#!/usr/bin/env bash
near call $CONTRACT buyTour '{"tourId": "ID-1655110327981726020"}' --depositYocto=1000000000000000000000000 --accountId $OWNER