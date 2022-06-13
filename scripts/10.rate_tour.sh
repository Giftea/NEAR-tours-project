#!/usr/bin/env bash
near call $CONTRACT rateTour '{"rate": { "tourId": "ID-1655110327981726020", "rate":5} }' --accountId $OWNER
