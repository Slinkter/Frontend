import boto3
from boto3.dynamodb.conditions import Key

dynamodb_client = boto3.client('dynamodb', region_name="us-west-2")

response = dynamodb_client.get_item(
    TableName='catalog',
    Key={
        'catalog_id': {'S': 'beauty_001'},
        'page_id': {'S': '1'}
    }
)

print("Query 1")
print(response['Item'])

response = dynamodb_client.get_item(
    TableName='catalog',
    Key={
        'catalog_id': {'S': 'beauty_002'},
        'page_id': {'S': '1'}
    }
)

print("Query 2")
print(response['Item'])

response = dynamodb_client.query(
    TableName='catalog',
    KeyConditionExpression='catalog_id = :catalog_id',
    ExpressionAttributeValues={
        ':catalog_id': {'S': 'beauty_001'}
    }
)

print("Query 3")
print(response['Items'])

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('catalog')

response = table.scan()
data = response['Items']

print("Query 4")
print(response['Items'])
