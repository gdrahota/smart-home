#!/bin/bash

echo "Starting replica set initialize"
until mongo --host smart-home--mongodb-0 --eval "print(\"waited for connection\")"
do
    sleep 2
done
echo "Connection finished"
echo "Creating replica set"
mongo --host smart-home--mongodb-0 <<EOF
rs.initiate(
  {
    _id : 'rs0',
    members: [
      { _id : 0, host : "smart-home--mongodb-0:27017" },
      { _id : 1, host : "smart-home--mongodb-1:27017" },
      { _id : 2, host : "smart-home--mongodb-2:27017" }
    ]
  }
)
EOF
echo "replica set created"
