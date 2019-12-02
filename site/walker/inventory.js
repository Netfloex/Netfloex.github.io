var lastInventory = 0
Create.inventory = function () {
  if (new Date() - lastInventory<500) {
    return
  }
  lastInventory = new Date()
  d("#inventory").classList.toggle("invHidden")
}
