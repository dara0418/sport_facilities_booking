import json
from django.core import serializers

""" This function helps to serialize an object to json format.
"""
def to_json(obj):
    data = serializers.serialize('json', [obj,])
    struct = json.loads(data)
    return json.dumps(struct[0])
