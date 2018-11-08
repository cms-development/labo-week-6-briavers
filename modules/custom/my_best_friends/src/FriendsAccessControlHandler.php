<?php

namespace Drupal\my_best_friends;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Best Friends entity.
 *
 * @see \Drupal\my_best_friends\Entity\Friends.
 */
class FriendsAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    /** @var \Drupal\my_best_friends\Entity\FriendsInterface $entity */
    switch ($operation) {
      case 'view':
        if (!$entity->isPublished()) {
          return AccessResult::allowedIfHasPermission($account, 'view unpublished best friends entities');
        }
        return AccessResult::allowedIfHasPermission($account, 'view published best friends entities');

      case 'update':
        return AccessResult::allowedIfHasPermission($account, 'edit best friends entities');

      case 'delete':
        return AccessResult::allowedIfHasPermission($account, 'delete best friends entities');
    }

    // Unknown operation, no opinion.
    return AccessResult::neutral();
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    return AccessResult::allowedIfHasPermission($account, 'add best friends entities');
  }

}
