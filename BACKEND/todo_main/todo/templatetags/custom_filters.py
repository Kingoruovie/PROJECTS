from django import template

register = template.Library()


@register.filter(name='truncate_words')
def truncate_words(value:str, num_words):
    words = value.split()
    if len(words) <= num_words: return value
    return ' '.join(words[:num_words]) + '...'