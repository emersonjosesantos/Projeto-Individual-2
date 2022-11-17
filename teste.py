import mysql.connector
from mysql.connector import errorcode

# Obtenha informações da string de conexão do portal

config = {
  'host':'222-1sis-grupo7@bandtec.com.br',
  'user':'Monitoll',
  'password':'Grupo7@123',
  'database':'Monitoll'
}

# Construir string de conexão

try:
   conn = mysql.connector.connect(**config)
   print("Connection established")
except mysql.connector.Error as err:
  if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
    print("Something is wrong with the user name or password")
  elif err.errno == errorcode.ER_BAD_DB_ERROR:
    print("Database does not exist")
  else:
    print(err)
else:
  cursor = conn.cursor()

# Ler dados
cursor.execute("SELECT * FROM inventory;")
rows = cursor.fetchall()
print("Read",cursor.rowcount,"row(s) of data.")

  # Imprimir todas as linhas
for row in rows:
    print("Data row = (%s, %s, %s)" %(str(row[0]), str(row[1]), str(row[2])))


# Elimine a tabela anterior com o mesmo nome, se existir uma
cursor.execute("DROP TABLE IF EXISTS inventory;")
print("Finished dropping table (if existed).")

# Criando tabela
cursor.execute("CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);")
print("Finished creating table.")

# Inserindo alguns dados na tabela
cursor.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s);", ("banana", 150))
print("Inserted",cursor.rowcount,"row(s) of data.")
cursor.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s);", ("orange", 154))
print("Inserted",cursor.rowcount,"row(s) of data.")
cursor.execute("INSERT INTO inventory (name, quantity) VALUES (%s, %s);", ("apple", 100))
print("Inserted",cursor.rowcount,"row(s) of data.")

# Limpar
conn.commit()
cursor.close()
conn.close()
print("Done.")