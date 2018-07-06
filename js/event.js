function changeMaterial(name_material){
  switch (name_material) {
    case 'wood':{
      uniforms_texture.specularMap.value = wood_maps['cspec'] ;
      uniforms_texture.diffuseMap.value = wood_maps['cdiff'] ;
      uniforms_texture.roughnessMap.value = wood_maps['rough'] ;
      uniforms_texture.normalMap.value = wood_maps['normal'] ;
    }break;

    case 'fabric':{
      uniforms_texture.specularMap.value = fabric_maps['cspec'] ;
      uniforms_texture.diffuseMap.value = fabric_maps['cdiff'] ;
      uniforms_texture.roughnessMap.value = fabric_maps['rough'] ;
      uniforms_texture.normalMap.value = fabric_maps['normal'] ;
    }break;

    case 'croc':{
      uniforms_texture.specularMap.value = croc_maps['cspec'] ;
      uniforms_texture.diffuseMap.value = croc_maps['cdiff'] ;
      uniforms_texture.roughnessMap.value = croc_maps['rough'] ;
      uniforms_texture.normalMap.value = croc_maps['normal'] ;
    }break;

    case 'white':{
      uniforms_combo.specularMap.value = white_maps['cspec'] ;
      uniforms_combo.diffuseMap.value = white_maps['cdiff'] ;
      uniforms_combo.roughnessMap.value = white_maps['rough'] ;
      uniforms_combo.normalMap.value = white_maps['normal'] ;
    }break;

    case 'pink':{
      uniforms_combo.specularMap.value = pink_maps['cspec'] ;
      uniforms_combo.diffuseMap.value = pink_maps['cdiff'] ;
      uniforms_combo.roughnessMap.value = pink_maps['rough'] ;
      uniforms_combo.normalMap.value = pink_maps['normal'] ;
    }

  }

  Render();

}


function selected(elemId){

  var els = ['ww','wp','jw','jp','cw','cp'];

  var sel = document.getElementById(elemId);
  sel.classList.add('w3-border-red');
  sel.classList.add('w3-bottombar');

  var col = '';
  var riv = '';

  if(elemId[0]=='w'){
    riv = "Legno";
  }else if(elemId[0]=='j'){
    riv = "Jeans";
  }else if(elemId[0]=='c'){
    riv = "Finta pelle nera";
  }

  if(elemId[1]=='w'){
    col = "Bianco";
  }else if(elemId[1]=='p'){
    col = "Rosa";
  }

  document.getElementById('rivestimento').innerHTML = riv;
  document.getElementById('colore').innerHTML = col;

  for(i=0;i<els.length;i++){
    if(els[i]!=elemId){
      var no_sel = document.getElementById(els[i]);
      no_sel.classList.remove('w3-border-red');
      no_sel.classList.remove('w3-bottombar');
    }
  }

}
