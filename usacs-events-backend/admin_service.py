from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random
import string

app = Flask(__name__)
CORS(app)

@app.route('/new_event', methods=['POST'])
def add_new_event():
    with open('events.json', 'r') as f:
        req = request.get_json()
        body = json.load(f)
        
        event_id = get_event_id()
        while event_id in body:
            event_id = get_event_id()
        
        body[event_id] = req

    with open('events.json', 'w') as f:
        json.dump(body, f)
        return jsonify({"eventId": event_id})

def get_event_id():
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(0,6))


@app.route('/edit_event', methods=['POST'])
def edit_event():
    with open('events.json', 'r') as f:
        req = request.get_json()
        body = json.load(f)
        
        body[req['eventId']] = req['content']

    with open('events.json', 'w') as f:
        json.dump(body, f)
        return jsonify({"eventId": req['eventId']})

@app.route('/remove_event', methods=['POST'])
def remove_event():
    with open('events.json', 'r') as f:
        req = request.get_json()
        body = json.load(f)
        body.pop(req['eventId'])

    with open('events.json', 'w') as f:
        json.dump(body, f)
        return jsonify({"eventId": req['eventId']})

if __name__ == "__main__":
    app.run()