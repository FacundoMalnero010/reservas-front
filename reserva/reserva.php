<!doctype html>
<html lang="es">

<head>
  <title>Reserva Linq</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
	integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
	<link rel="shortcut icon" href="../index/images/favicon.png" type="image/x-icon">
	<link rel="stylesheet" href="reserva.css?v=<?php echo time(); ?>">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
</head>

<body>
  <header>

  </header>
  <main>
	<div id="contenedor" class="d-flex justify-content-center align-items-center">
		<div id="form" class="d-flex justify-content-center align-items-center flex-column">
			<h1>Linq</h1>
			<form method="POST" action="" class="d-flex justify-content-center align-items-center flex-column col-9" id="form" name="form">
				<div id="tiempo" class="d-flex justify-content-center align-items-center">
					<div id="columna1" class="d-flex justify-content-center align-items-center flex-column col-6">
						<label for="fecha" id="fechaLabel" class="text-light w-50 text-center">Dia</label>
						<input type="date" name="fecha" id="fecha" min="" class="form-control" onchange="validar(); verificarDisponibilidad()">
					</div>
					<div id="columna2" class="d-flex justify-content-center align-items-center flex-column offset-1 col-4">
						<label for="hora">Horario</label>
						<select type="time" id="horario" class="form-control" name="horario" onchange="validar()">
							<option value="" selected></option>
						</select>
					</div>
				</div>
				<label for="comensales" id="comensalesLabel" class="text-light w-50 text-center">Comensales</label>
				<input type="number" name="comensales" id="comensales" class="form-control" placeholder="0" min="1" onchange="validar()">
				<label for="email" id="emailLabel" class="text-light w-50 text-center">Email</label>
				<input type="email" name="email" id="email" class="form-control" placeholder="tuemail@gmail.com" onkeyup="validar()">
				<button type="submit" id="submit" class="btn" disabled>Reservar</button>
			</form>
		</div>
	</div>

	<?php

		//Devuelve todos los horarios reservados
		function consultarDisponibilidad(){

			$host = 'localhost'; 
			$user = 'root'; 
			$password = ''; 
			$database = 'reservas';

			$conexion = mysqli_connect($host, $user, $password, $database);

			if (!$conexion) {
				die('Error al conectar a la base de datos: ' . mysqli_connect_error());
			}

			$consulta = 'Select fecha,horario from reservas';
			$resultado = mysqli_query($conexion,$consulta);

			$fechasReservadas = array();

			while ($fila = $resultado->fetch_assoc()) {
				$fechasReservadas[] = $fila;
			}

			return $fechasReservadas;

		}

		if ($_SERVER['REQUEST_METHOD'] === 'POST') {

			$host = 'localhost'; 
			$user = 'root'; 
			$password = ''; 
			$database = 'reservas';

			$conexion = mysqli_connect($host, $user, $password, $database);

			if (!$conexion) {
				die('Error al conectar a la base de datos: ' . mysqli_connect_error());
			}

			$email = $_POST['email'];
			$fecha = $_POST['fecha'];
			$comensales = $_POST['comensales'];
			$horario = $_POST['horario'];

			$tabla = 'reservas';

			try{
				$resultado = mysqli_query($conexion, "SHOW TABLES LIKE '$tabla'");
				if (mysqli_num_rows($resultado) == 0) {
					$query = "CREATE TABLE $tabla (
							id BIGINT AUTO_INCREMENT PRIMARY KEY,
							email VARCHAR(100) NOT NULL,
							fecha VARCHAR(30) NOT NULL,
							horario VARCHAR(10) NOT NULL,
							comensales INT(2) NOT NULL
							)";

					$crearTabla = mysqli_query($conexion, $query);

					if ($crearTabla) {
						$consulta = "INSERT INTO reservas (email,fecha,horario,comensales) VALUES ('$email', '$fecha', '$horario', '$comensales')";
						$resultado = mysqli_query($conexion, $consulta);
					} else {
						echo "Error al crear la tabla: " . mysqli_error($conexion);
					}
				} else {
					$consulta = "INSERT INTO reservas (email,fecha,horario,comensales) VALUES ('$email', '$fecha', '$horario', '$comensales')";
					$resultado = mysqli_query($conexion, $consulta);
				}
			}
			catch(mysqli_sql_exception $e){
				echo $e->getMessage();
			}
			finally{
				mysqli_close($conexion);
				exit();
			}

			//No funciona el envio de mail

			// Incluimos la clase PHPMailer
			/*require_once "../PHPMailer/src/PHPMailer.php";
			require_once "../PHPMailer/src/SMTP.php";
			require_once "../PHPMailer/src/Exception.php";

			// Creamos una nueva instancia de PHPMailer
			$mail = new PHPMailer\PHPMailer\PHPMailer();

			// Configuramos el servidor SMTP y el puerto utilizado
			$mail->isSMTP();
			$mail->Host = "smtp.gmail.com";
			$mail->SMTPAuth = true;
			$mail->Username = "facundomalnero010@gmail.com";
			$mail->Password = "Wjasdf080";
			$mail->Port = 465;
			$mail->SMTPSecure = "ssl";

			// Configuramos el remitente y el destinatario
			$mail->setFrom("facundomalnero010@gmail.com", "Facundo Malnero");
			$mail->addAddress($email);

			// Configuramos el asunto del correo electrónico
			$mail->Subject = "Confirmación de reserva";

			// Configuramos el cuerpo del correo electrónico
			$mail->isHTML(true);
			$mail->Body = '
				<html>
					<head>
						<title>Confirmación de reserva</title>
						<style>
							body {
								background-color: #F8F8F8;
								font-family: Arial, sans-serif;
								font-size: 14px;
								line-height: 1.5;
								color: #333333;
								padding: 20px;
							}
							h1, h2, h3 {
								color: #0066CC;
								font-weight: normal;
							}
							p {
								margin: 0 0 20px;
							}
							table {
								border-collapse: collapse;
								width: 100%;
							}
							table, th, td {
								border: 1px solid #CCCCCC;
							}
							th, td {
								padding: 8px;
								text-align: left;
							}
							th {
								background-color: #EFEFEF;
							}
						</style>
					</head>
					<body>
						<h1>Confirmación de reserva</h1>
						<p>Estimado/a</p>
						<p>Le confirmamos que hemos recibido su reserva. Los detalles son los siguientes:</p>
						<table>
							<tr>
								<th>Fecha de reserva</th>
								<td>'.$fecha.'</td>
							</tr>
							<tr>
								<th>Horario</th>
								<td>'.$horario.'</td>
							</tr>
							<tr>
								<th>Comensales</th>
								<td>'.$comensales.'</td>
							</tr>
							<tr>
								<th>Correo electrónico</th>
								<td>'.$email.'</td>
							</tr>
						</table>
						<p>Si desea hacer algún cambio a su reserva, por favor contáctenos lo antes posible. Gracias por su preferencia.</p>
					</body>
				</html>
			';

			$mail->send();

			// Enviamos el correo electrónico y verificamos si ha sido enviado correctamente
			if ($mail->send()) {
				echo "El correo electrónico ha sido enviado correctamente";
			} else {
				echo "Ha ocurrido un error al enviar el correo electrónico: " . $mail->ErrorInfo;
			}*/
			
		}

	?>

  </main>
  <footer>

  </footer>

  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
	integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous">
  </script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
	integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous">
  </script>
  <script src="reserva.js?v=<?php echo time(); ?>"></script>
  <script>

	function verificarDisponibilidad(){
		let fechasOcupadas = <?php	echo json_encode(consultarDisponibilidad());	?>;
		let horariosOcupados = [];
		let fechaActual = document.getElementById('fecha').value;

		//Anulo horarios bloqueados al cambiar dia
		let select = document.getElementById('horario');
		select.value = '';
		let options = select.options;

		for(let i=0;i<options.length;i++){
			if(options[i].classList.contains('ocupado')){
				options[i].classList.remove('ocupado');
				options[i].disabled = false;
			}
		}

		//Discrimino horarios reservados del dia seleccionado
		for(let fecha in fechasOcupadas){
			if(fechasOcupadas[fecha]['fecha'] === fechaActual){
				horariosOcupados.push(fechasOcupadas[fecha]['horario']);
			}
		}

		//Los deshabilito
		for(let horario in horariosOcupados){
			let option = document.querySelector('select[name="horario"] option[value="'+horariosOcupados[horario]+'"]');
			option.disabled = true;
			option.classList.add('ocupado');
		}
	}

	</script>

</body>

</html>