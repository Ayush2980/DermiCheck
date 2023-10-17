from flask import Flask, render_template, request , jsonify , make_response
import os
import json
import numpy as np
import cv2
import tensorflow as tf
from keras.models import load_model
import cloudinary
from cloudinary.uploader import upload
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime , timedelta
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from bson import json_util
from functools import wraps

from pymongo import MongoClient
client = MongoClient()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# JSON ENCODER

def parse_json(data):
    return json.loads(json_util.dumps(data))

def predict_skin_disease(img):
    model = load_model('model.h5')
    vgg_model = load_model('vgg_model.h5')
    # img = cv2.imread(img)
    img = cv2.resize(img, (180,180))
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)
    img = vgg_model.predict(img)
    img = img.reshape(1,-1)
    pred = model.predict(img)[0]
    print(pred)
    predicted_class = np.argmax(pred)        

    disease_list = ['Acne and Rosacea Photos',
            'Normal',
            'vitiligo',
            'Tinea Ringworm Candidiasis and other Fungal Infections',
            'Melanoma Skin Cancer Nevi and Moles',
            'Eczema Photos']
    return disease_list[predicted_class]


app.config['CLOUDINARY_CLOUD_NAME'] = 'dinvkvrug'
app.config['CLOUDINARY_API_KEY'] = '399824364793338'
app.config['CLOUDINARY_API_SECRET'] = 'c2nvh14c_AxVmRdVqfAz7AKUaWA'

# Initialize Cloudinary
cloudinary.config(
    cloud_name=app.config['CLOUDINARY_CLOUD_NAME'],
    api_key=app.config['CLOUDINARY_API_KEY'],
    api_secret=app.config['CLOUDINARY_API_SECRET']
)

@app.route("/uploadTest" , methods=["POST"])
def do_upload():
    f = request.files['image']
    frame = cv2.imdecode(np.frombuffer(f.read(), np.uint8), cv2.IMREAD_COLOR)
    print(frame)
    try:
        disease = predict_skin_disease(frame)
        return jsonify({"status" : True , "disease" : disease , "cure" : "Dont give a fuck" , "symptoms" : "Bad"})
    except:
        return jsonify({"status" : False , "meassage" : "There was some error !!"})


# #Authentication
bcrypt = Bcrypt(app) 

#Mongo DB
client = MongoClient("localhost", 27017)
client = MongoClient("mongodb://localhost:27017/")
db = client["dermiCheck"]
collection = db["user"]



def token_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.args.get('token')  # Get the token from the cookie


        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        request.current_user = data
        request.token = token
        return f(*args, **kwargs)

    return decorated_function

@app.route('/register', methods=['POST'])
def register():
    email = request.form.getlist('email')[0]
    hashed_password = bcrypt.generate_password_hash(request.form.getlist('password')[0]).decode('utf-8')
    phoneNumber = request.form.getlist('number')[0]

    existing_user = collection.find_one({'email': email})
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 400
    hashed_password = bcrypt.generate_password_hash(hashed_password, method='sha256')
    new_user = {
        'email': email,
        'password': hashed_password,
    }
    user_id = collection.insert_one(new_user).inserted_id
    token = jwt.encode({'user_id': user_id['_id'], 'exp': datetime.utcnow() + timedelta(hours=1)}, app.config['SECRET_KEY'], algorithm='HS256')

    return jsonify({'message': 'User registered successfully', 'token': token})

@app.route('/login', methods=['POST'])
def login():
    email = request.form.getlist('email')[0]

    user = collection.find_one({"email" : email})
    
    if user and bcrypt.check_password_hash(user['password'], request.form.getlist('password')[0]):
        token = jwt.encode({'user_id': parse_json(user['_id']), 'exp': datetime.utcnow() + timedelta(hours=1)}, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify({'token': parse_json(token)})
    
    return jsonify({'message': 'Login failed. Invalid credentials'}), 401


@app.route('/profileUpdate' , methods=["POST"])
@token_required
def profilePicUpdate():
    file = request.files['file']
    result = upload(file)
    return jsonify({'token' : request.token , 'user' : parse_json(request.current_user)})

@app.route("/data" , methods=["POST"])
def do():
    f = request.files['file']
    frame = cv2.imdecode(np.frombuffer(f.read(), np.uint8), cv2.IMREAD_COLOR)
    disease = predict_skin_disease(frame)
    result =  {'disease' : disease  , 'College' : 'IIT ISM Dhanbad'}
    return jsonify({"status" : True ,  "message" : "Found", "data" : parse_json(result)})

if __name__ == "__main__":
    app.run(debug=True , port=8000)