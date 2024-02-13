from flask import Flask, render_template, request , jsonify , make_response
import json
import numpy as np
import cv2
from keras.models import load_model
from bson import json_util
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
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
    # print(pred)
    predicted_class = np.argmax(pred)        

    disease_list = ['Acne and Rosacea Photos',
            'Normal',
            'vitiligo',
            'Tinea Ringworm Candidiasis and other Fungal Infections',
            'Melanoma Skin Cancer Nevi and Moles',
            'Eczema Photos']
    return disease_list[predicted_class]

@app.route("/hello" ,methods=["POST"])
def do():
    try:
        data = request.get_json()
        return jsonify({"message" : data})
        # img = data.get('name')
        # return img
    except Exception as e: 
        print(e)
        return e


@app.route("/uploadTest" , methods=["POST"])
def do_upload():
    try:
        data = request.get_json()
        f = data.get('image')
        print(type(f))
        npImage = np.array(f['buffer']['data'] , dtype=np.uint8)
        image_np = cv2.imdecode(npImage, cv2.IMREAD_COLOR)
        disease = predict_skin_disease(image_np)
        return disease
    except Exception as e:
        return e

if __name__ == "__main__":
    app.run(debug=True , port=5000)



    #env\Scripts\activate python .\app.py 