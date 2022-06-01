#!/usr/bin/env bash
near call $CONTRACT rateTour '{"rate": {"id": "ABC3333", "tourId": "056NNNNN76", "rate":5} }' --accountId $OWNER
