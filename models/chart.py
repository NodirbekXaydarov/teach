from odoo import models, fields

class Chart(models.Model):
    _name = 'chart'  # Change to lowercase
    _description = 'Chart for teach'  # Corrected description if needed

    chart = fields.Char(string='Student Name')