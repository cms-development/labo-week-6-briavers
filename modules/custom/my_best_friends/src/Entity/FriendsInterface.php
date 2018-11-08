<?php

namespace Drupal\my_best_friends\Entity;

use Drupal\Core\Entity\ContentEntityInterface;
use Drupal\Core\Entity\RevisionLogInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Best Friends entities.
 *
 * @ingroup my_best_friends
 */
interface FriendsInterface extends ContentEntityInterface, RevisionLogInterface, EntityChangedInterface, EntityOwnerInterface {

  // Add get/set methods for your configuration properties here.

  /**
   * Gets the Best Friends name.
   *
   * @return string
   *   Name of the Best Friends.
   */
  public function getName();

  /**
   * Sets the Best Friends name.
   *
   * @param string $name
   *   The Best Friends name.
   *
   * @return \Drupal\my_best_friends\Entity\FriendsInterface
   *   The called Best Friends entity.
   */
  public function setName($name);

  /**
   * Gets the Best Friends creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Best Friends.
   */
  public function getCreatedTime();

  /**
   * Sets the Best Friends creation timestamp.
   *
   * @param int $timestamp
   *   The Best Friends creation timestamp.
   *
   * @return \Drupal\my_best_friends\Entity\FriendsInterface
   *   The called Best Friends entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Best Friends published status indicator.
   *
   * Unpublished Best Friends are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Best Friends is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Best Friends.
   *
   * @param bool $published
   *   TRUE to set this Best Friends to published, FALSE to set it to unpublished.
   *
   * @return \Drupal\my_best_friends\Entity\FriendsInterface
   *   The called Best Friends entity.
   */
  public function setPublished($published);

  /**
   * Gets the Best Friends revision creation timestamp.
   *
   * @return int
   *   The UNIX timestamp of when this revision was created.
   */
  public function getRevisionCreationTime();

  /**
   * Sets the Best Friends revision creation timestamp.
   *
   * @param int $timestamp
   *   The UNIX timestamp of when this revision was created.
   *
   * @return \Drupal\my_best_friends\Entity\FriendsInterface
   *   The called Best Friends entity.
   */
  public function setRevisionCreationTime($timestamp);

  /**
   * Gets the Best Friends revision author.
   *
   * @return \Drupal\user\UserInterface
   *   The user entity for the revision author.
   */
  public function getRevisionUser();

  /**
   * Sets the Best Friends revision author.
   *
   * @param int $uid
   *   The user ID of the revision author.
   *
   * @return \Drupal\my_best_friends\Entity\FriendsInterface
   *   The called Best Friends entity.
   */
  public function setRevisionUserId($uid);

}
