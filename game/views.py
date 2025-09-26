import random
from django.shortcuts import render, redirect

# 1️⃣ Home Page (Welcome Page)
def home_view(request):
    return render(request, "home.html")

# 2️⃣ Difficulty Selection Page
def mgame_view(request):
    request.session['active'] = False  # So difficulty selection shows
    request.session['status'] = None
    return render(request, "mgame.html")

# 3️⃣ Start new game
def start_game(request, level):
    if level == "easy":
        max_number = 50
    elif level == "medium":
        max_number = 100
    else:
        max_number = 200

    # Save game data in session
    request.session["target"] = random.randint(1, max_number)
    request.session["moves_left"] = 10
    request.session["max_number"] = max_number
    request.session["active"] = True
    request.session["message"] = "Make your guess!"
    request.session["status"] = None

    return redirect("play_game")

# 4️⃣ Game Play
def play_game(request):
    active = request.session.get("active", False)
    target = request.session.get("target", 0)
    message = request.session.get("message", "")
    moves_left = request.session.get("moves_left", 0)

    status = request.session.get("status", None)

    context = {
        "active": active,
        "moves_left": moves_left,
        "max_number": request.session.get("max_number", 0),
        "message": message,
        "blurred_number": blur_number(target) if active else target,
        "status": status
    }
    return render(request, "mgame.html", context)

# 5️⃣ Handle user guess
def guess_number(request):
    if not request.session.get("active", False):
        return redirect("play_game")

    guess = int(request.POST.get("guess", 0))
    target = request.session["target"]
    moves_left = request.session["moves_left"] - 1
    request.session["moves_left"] = moves_left

    if guess == target:
        request.session["message"] = f"🎉 You Win! The number was {target}"
        request.session["active"] = False
        request.session["status"] = "win"
    elif moves_left == 0:
        request.session["message"] = f"❌ Game Over! The number was {target}"
        request.session["active"] = False
        request.session["status"] = "lose"
    elif guess < target:
        request.session["message"] = "📈 Too Low! Try a higher number."
    else:
        request.session["message"] = "📉 Too High! Try a lower number."

    return redirect("play_game")

# 6️⃣ Replay game
def replay_game(request):
    request.session.flush()
    return redirect("home")

# 7️⃣ Blur helper function
def blur_number(num):
    if not num or num <= 0:
        return "?"
    num_str = str(num)
    return num_str[0] + "*" * (len(num_str) - 1)
