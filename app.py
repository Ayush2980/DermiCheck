from flask import Flask, render_template, request , jsonify
import os
import json
import requests

Upload = 'static/'
app = Flask(__name__)
app.config['uploadFolder'] = Upload


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/data/<string:name>" , methods=["POST"])
def do(name):
    f = request.files['file']
    f.save(os.path.join(app.config['uploadFolder'], f.filename))
    print(f.filename)
    result =  {'name' : name  , 'College' : 'IIT ISM Dhanbad'}
    return jsonify({"status" : True ,  "message" : "Found", "data" : result})

@app.route("/predict/<string:disease>" , methods=["POST"])
def do_it(disease):
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static", "data.json")
    data = json.load(open(json_url))
    return jsonify({"status" : True ,  "message" : "Found", "data" : data })

if __name__ == "__main__":
    app.run(debug=True)