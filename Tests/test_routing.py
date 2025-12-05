from django.urls import reverse, resolve

def test_routing_upload():
    path = reverse("upload")
    assert resolve(path).url_name == "upload"

def test_routing_check():
    path = reverse("check_api", args=[1])
    assert resolve(path).url_name == "check_api"

def test_routing_check_all():
    path = reverse("check_all")
    assert resolve(path).url_name == "check_all"
