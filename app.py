from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import random
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'tu_clave_secreta_muy_segura_aqui_123456'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///condicionales.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Modelos de base de datos
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    score = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    streak = db.Column(db.Integer, default=0)
    games_played = db.Column(db.Integer, default=0)
    correct_answers = db.Column(db.Integer, default=0)
    total_answers = db.Column(db.Integer, default=0)

class Example(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sentence = db.Column(db.String(200), nullable=False)
    explanation = db.Column(db.String(300), nullable=False)
    category = db.Column(db.String(50), nullable=False)

class GameHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    game_id = db.Column(db.Integer, nullable=False)
    score_earned = db.Column(db.Integer, default=0)
    correct = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Datos iniciales de ejemplos
def init_examples():
    if Example.query.count() == 0:
        examples = [
            # Reales
            {"sentence": "Si llueve, nos quedamos en casa.", "explanation": "Condición presente real. Consecuencia inmediata.", "category": "Reales"},
            {"sentence": "Si tienes hambre, come algo.", "explanation": "Condición presente. Consecuencia en imperativo.", "category": "Reales"},
            {"sentence": "Si terminas temprano, llámame.", "explanation": "Condición futura posible. Consecuencia en imperativo.", "category": "Reales"},
            {"sentence": "Si estudias, apruebas el examen.", "explanation": "Condición general/real. Relación causa-efecto.", "category": "Reales"},
            {"sentence": "Si quieres venir, debes avisar.", "explanation": "Condición posible. Consecuencia con verbo modal.", "category": "Reales"},
            # Potenciales
            {"sentence": "Si tuviera dinero, compraría una casa.", "explanation": "Condición improbable en presente. Deseo/consecuencia hipotética.", "category": "Potenciales"},
            {"sentence": "Si pudiera volar, viajaría por todo el mundo.", "explanation": "Condición imposible física. Consecuencia imaginaria.", "category": "Potenciales"},
            {"sentence": "Si tuviese más tiempo, te ayudaría.", "explanation": "Condición improbable. Oferta cortés hipotética.", "category": "Potenciales"},
            {"sentence": "Si lloviera mañana, cancelaríamos el picnic.", "explanation": "Condición meteorológica futura improbable.", "category": "Potenciales"},
            {"sentence": "Si fuera tú, no iría a esa reunión.", "explanation": "Consejo hipotético con improbabilidad de ser el otro.", "category": "Potenciales"},
            # Irreales
            {"sentence": "Si hubieras estudiado, habrías aprobado el examen.", "explanation": "Condición pasada no cumplida. Consecuencia lógica fallida.", "category": "Irreales"},
            {"sentence": "Si hubiese sabido que venías, te habría esperado.", "explanation": "Condición pasada no conocida. Consecuencia deseada no realizada.", "category": "Irreales"},
            {"sentence": "Si hubiéramos salido antes, no habríamos perdido el tren.", "explanation": "Acción pasada no realizada. Consecuencia negativa evitable.", "category": "Irreales"},
            {"sentence": "Si hubieses llamado, habría ido a recogerte.", "explanation": "Acción pasada no realizada. Oferta de ayuda no materializada.", "category": "Irreales"},
            {"sentence": "Si no hubiera llovido, la boda habría sido en el jardín.", "explanation": "Condición meteorológica pasada no deseada. Plan original frustrado.", "category": "Irreales"},
        ]
        
        for ex in examples:
            example = Example(
                sentence=ex["sentence"],
                explanation=ex["explanation"],
                category=ex["category"]
            )
            db.session.add(example)
        
        db.session.commit()
        print("Ejemplos iniciales creados!")

# Rutas de autenticación
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        # Verificar si el usuario ya existe
        user = User.query.filter_by(username=username).first()
        if user:
            flash('El nombre de usuario ya existe')
            return redirect(url_for('register'))
        
        # Crear nuevo usuario
        new_user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        flash('Registro exitoso. Por favor inicia sesión.')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Usuario o contraseña incorrectos')
    
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

# Rutas principales
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/game/<int:game_id>')
@login_required
def game(game_id):
    return render_template(f'games/game{game_id}.html', game_id=game_id)

@app.route('/stats')
@login_required
def stats():
    games_history = GameHistory.query.filter_by(user_id=current_user.id).order_by(GameHistory.timestamp.desc()).limit(10).all()
    
    category_count = {
        'Reales': Example.query.filter_by(category='Reales').count(),
        'Potenciales': Example.query.filter_by(category='Potenciales').count(),
        'Irreales': Example.query.filter_by(category='Irreales').count()
    }
    
    return render_template('stats.html', 
                         user=current_user,
                         games_history=games_history,
                         category_count=category_count)

# API para obtener ejemplos aleatorios
@app.route('/api/random_example')
def random_example():
    category = request.args.get('category', None)
    
    if category and category in ['Reales', 'Potenciales', 'Irreales']:
        examples = Example.query.filter_by(category=category).all()
    else:
        examples = Example.query.all()
    
    example = random.choice(examples)
    
    return jsonify({
        'id': example.id,
        'sentence': example.sentence,
        'explanation': example.explanation,
        'category': example.category
    })

# API para actualizar puntuación
@app.route('/api/update_score', methods=['POST'])
@login_required
def update_score():
    data = request.json
    correct = data.get('correct', False)
    game_id = data.get('game_id', 0)
    
    points_earned = 0
    
    if correct:
        points_earned = 10 * current_user.level
        current_user.score += points_earned
        current_user.streak += 1
        current_user.correct_answers += 1
        
        if current_user.streak % 5 == 0:
            current_user.level += 1
    else:
        current_user.streak = 0
    
    current_user.games_played += 1
    current_user.total_answers += 1
    
    history = GameHistory(
        user_id=current_user.id,
        game_id=game_id,
        score_earned=points_earned if correct else 0,
        correct=correct
    )
    
    db.session.add(history)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'score': current_user.score,
        'level': current_user.level,
        'streak': current_user.streak,
        'points_earned': points_earned
    })

# Inicializar base de datos
with app.app_context():
    db.create_all()
    init_examples()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
