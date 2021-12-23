<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>

	<form id="create-topic-form">

		<input type="text" name="topic_name">

		<select name='publicity'>
			<option value='public'>Make Public</option>
			<option value='private'>Make Private</option>
		</select>

		<button type='button' id='create-topic-btn'>Create Topic</button>
		
	</form>

	<!-- <script src="js/jquery.min.js"></script> -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.24.0/axios.min.js" integrity="sha512-u9akINsQsAkG9xjc1cnGF4zw5TFDwkxuc9vUp5dltDWYCSmyd0meygbvgXrlc/z7/o4a19Fb5V0OUE58J7dcyw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	
	<script>
		
		document.addEventListener("DOMContentLoaded", function(){


				const form = document.querySelector("#create-topic-form");


		document.querySelector("#create-topic-btn").addEventListener("click", async function(){

			let topic_name = form.topic_name.value.trim().length > 0 ? form.topic_name.value : null;

			if(topic_name != null){

				const topic_object = {
					topic_name: topic_name,
					topic_publicity: form.publicity.value
				}

				let result = await axios.post("http://localhost:5000/api/topic/create-topic", topic_object)


				console.log(result);





			}


		})


		})

		
	</script>
	




</body>
</html>