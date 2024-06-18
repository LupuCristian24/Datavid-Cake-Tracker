from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, date

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///birthday.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Member(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    birth_date = db.Column(db.Date, nullable=False)
    country = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return f'<Member {self.first_name} {self.last_name}>'

@app.route('/api/members', methods=['POST'])
def add_member():
    data = request.json
    first_name = data['first_name']
    last_name = data['last_name']
    birth_date = datetime.strptime(data['birth_date'], '%Y-%m-%d').date()
    country = data['country']
    city = data['city']

    if (date.today() - birth_date).days < 18 * 365:
        return jsonify({"message": "Member must be at least 18 years old"}), 400

    if Member.query.filter_by(first_name=first_name, last_name=last_name, country=country, city=city).first():
        return jsonify({"message": "Member with the same name and location already exists"}), 400

    new_member = Member(first_name=first_name, last_name=last_name, birth_date=birth_date, country=country, city=city)
    db.session.add(new_member)
    db.session.commit()

    return jsonify({"message": "Birthday added successfully!"}), 201

@app.route('/api/members', methods=['GET'])
def get_members():
    members = Member.query.all()
    members_list = []
    for member in members:
        members_list.append({
            'id': member.id,
            'first_name': member.first_name,
            'last_name': member.last_name,
            'birth_date': member.birth_date.strftime('%m/%d/%Y'),
            'country': member.country,
            'city': member.city
        })

    return jsonify(members_list), 200

@app.route('/api/members/<int:id>', methods=['DELETE'])
def delete_member(id):
    member = Member.query.get(id)
    if not member:
        return jsonify({"message": "Member not found"}), 404

    db.session.delete(member)
    db.session.commit()

    return jsonify({"message": "Member deleted successfully"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=3001, debug=True)
