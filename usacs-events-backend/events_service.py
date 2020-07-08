from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_events():
    with open('events.json', 'r') as f:
        return jsonify(json.load(f))


@app.route('/<id>', methods=['GET'])
def get_event_by_id(id):
    with open('events.json', 'r') as f:
        return jsonify(json.load(f)[id])

if __name__ == "__main__":
    app.run()