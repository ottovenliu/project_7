import mysql.connector
from flask import Flask
from flask import request, redirect
from flask import render_template
from flask import session
import os
import json

from mysql.connector.cursor import MySQLCursor


# accountInfo = {"test": "test"}

app = Flask(
    __name__,
    static_url_path="/static",
    static_folder="static"
)

app.config['SECRET_KEY'] = os.urandom(24)


mydb = mysql.connector.Connect(
    host="localhost",
    user="user",
    password="lf187935",
    database="website",
    charset="utf8"
)


@app.route("/", methods=['GET', 'POST'])
def cindex():
    return render_template("homePage.html")


@app.route("/signout", methods=['GET', 'POST'])
def index():
    session.clear()
    return redirect('/')


@app.route("/signin", methods=["POST"])
def check():
    Account = request.form["account"]
    PassWord = request.form["password"]
    session['username'] = Account
    userDataBox = []

    mycursor = mydb.cursor()
    sql = "SELECT * FROM user WHERE username = '{username}'".format(
        username=Account)
    mycursor.execute(sql)
    myresult = mycursor.fetchall()

    for i in myresult:
        userDataBox.append(i[2])
    if(Account in userDataBox):
        pId = userDataBox.index(Account)
        if PassWord == myresult[pId][3]:
            return redirect('/member')
        else:
            return redirect("/error")
    else:
        return redirect("/error")


@app.route("/signup", methods=["POST"])
def signup():
    signup_name = request.form["name"]
    signup_username = request.form["account"]
    signup_password = request.form["password"]
    userDataBox = []

    mycursor = mydb.cursor()
    sql = "SELECT * FROM user WHERE username = '{username}'".format(
        username=signup_username)
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    for i in myresult:
        userDataBox.append(i[2])
    if(signup_username in userDataBox):
        message = request.args.get("message", "帳號已經被註冊")
        return render_template("errorPage.html", message_template=message)
    else:
        signup_sql = "INSERT INTO user (name,username,password) VALUES(%s, %s, %s)"
        val = (signup_name, signup_username, signup_password)
        mycursor.execute(signup_sql, val)
        mydb.commit()
        print(mycursor.rowcount, "was inserted")
        return redirect('/')


@app.route("/error/", methods=["GET"])
def error():
    message = request.args.get("message", "帳號或密碼錯誤")
    return render_template("errorPage.html", message_template=message)


@app.route("/member", methods=['GET', 'POST'])
def userpage():
    mycursor = mydb.cursor()
    sql = "SELECT * FROM user"
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    username = session.get('username')
    if username:
        userDataBox = []
        for i in myresult:
            userDataBox.append(i[2])
        pId = userDataBox.index(username)
        name = myresult[pId][1]

        return render_template("userPage.html", user_template=name)
    else:
        return redirect('/')


@app.route("/api/users")
def API():
    check_username = session.get('username')
    if check_username:
        message = request.args.get("username", check_username)
        message.encode('utf-8')
        mycursor = mydb.cursor()
        sql_json = "SELECT id,name,username FROM user WHERE username = '{username}'".format(
            username=message)
        mycursor.execute(sql_json)
        myresult = mycursor.fetchall()
        if len(myresult) != 0:
            user_info = {
                "data": {
                    "id": myresult[0][0],
                    "name": myresult[0][1],
                    "username": myresult[0][2]
                }
            }
            userInfo_json = json.dumps(user_info, ensure_ascii=False)
            return userInfo_json, message
        else:
            user_info = {
                "data": "null"
            }
            userInfo_json = json.dumps(user_info, ensure_ascii=False)

            return userInfo_json, message
    else:
        return redirect('/')


app.config['DEBUG'] = True
if __name__ == '__main__':
    app.run(port=3000)

# app.run(port=3000)
