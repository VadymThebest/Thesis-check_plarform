from rest_framework.permissions import BasePermission


class IsAdminAuthenticated(BasePermission):
    """
    Anonymous → 401
    Authenticated ama admin değil → 403
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False   # 401

        if not request.user.is_staff and not request.user.is_superuser:
            return False   # 403

        return True
