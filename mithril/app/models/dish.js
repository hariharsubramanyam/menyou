
(function() {
  Menyou.models = Menyou.models || {};

  Menyou.models.Dish = function(data) {
    this.name = m.prop(data.name);
    this.description = m.prop(data.description);
    this.price = m.prop(data.price);
    this.points = m.prop(data.points);
    //TODO ref to restaurant?
    //TODO 'virtuals'?
  };



})():
