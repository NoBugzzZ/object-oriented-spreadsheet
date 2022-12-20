function transform(f,...rest){
  return f.apply(null,rest);
}

const Tranform = {
  transform,
}

export default Tranform;