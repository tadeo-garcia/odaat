import boto3
import os


BUCKET_NAME = os.environ.get('BUCKET_NAME')
ACCESS_ID = os.environ.get('ACCESS_ID')
ACCESS_KEY = os.environ.get('ACCESS_KEY')
REGION_NAME = os.environ.get('REGION_NAME')


# Building your client
s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=ACCESS_ID,
                  aws_secret_access_key=ACCESS_KEY)


# grabbing all of your buckets
response = s3.list_buckets()

# Iterate over Buckets for response
for bucket in response['Buckets']:

    # Print the Name for each bucket
    print(bucket['Name'])


# Upload database.py with key test/testfile.csv
s3.upload_file(Bucket=BUCKET_NAME,
               #    Set filename and key.  database.py is any file on the same level as this file.  Purely for testing
               Filename='database.py',
               Key='test/testfile.csv')

# Get object metadata and print it
# response = s3.head_object(Bucket='capstone-project-steven',
#    Key='2019/final_report_01_01.csv')

# Print the size of the uploaded object
# print(response['ContentLength'])

# List only objects that start with '2018/final_'
# response = s3.list_objects(Bucket='capstone-project-steven',
#                            Prefix='2018/final_')

# Iterate over the objects
# if 'Contents' in response:
#   for obj in response['Contents']:
#       # Delete the object
#       s3.delete_object(Bucket='gid-staging', Key=obj['Key'])

# # Print the remaining objects in the bucket
# response = s3.list_objects(Bucket='gid-staging')

# for obj in response['Contents']:
#   	print(obj['Key'])
